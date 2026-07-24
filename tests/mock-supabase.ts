import http from 'http';
import net from 'net';

const PORT = 54321;

const mockHotelSettings = {
  id: 1,
  hotel_name: 'Haita',
  wifi_ssid: 'Haita_Guest',
  wifi_password: 'Welcome2026!',
  breakfast_hours: '6:30 AM – 9:30 AM',
  checkout_time: '11:00',
  reception_phone: '+84 28 1234 5678',
  reception_contact_label: 'Chat with Reception on Zalo',
  reception_contact_url: 'https://zalo.me/84281234567',
  jellyfin_url: 'https://movies.example.com/placeholder',
};

const mockRoom101 = {
  id: '10100000-0000-0000-0000-000000000101',
  room_number: '101',
  current_guest_id: 'g1',
  checkin_date: '2026-07-24',
  checkout_date: '2026-07-27',
  checkout_time: '11:00',
  weather_location_name: 'Ho Chi Minh City, Vietnam',
  weather_latitude: 10.7769,
  weather_longitude: 106.7009,
  housekeeping_status: 'clean',
  guest: {
    id: 'g1',
    first_name: 'David',
    last_name: 'Nguyen',
    preferred_language: 'en',
    welcome_message:
      'Welcome back, David. We hope you enjoy your stay with us at Haita — and that tonight feels worth celebrating.',
    special_occasion: 'Anniversary',
  },
};

const mockRecommendations = [
  {
    id: 'r1',
    name: 'Bánh Mì Huỳnh Hoa',
    description: 'Legendary loaded bánh mì stacked with cold cuts and pâté.',
    category: 'Food',
    distance_label: '6 min walk',
    hours_label: '6:00 AM – 9:00 PM',
    sort_order: 1,
    is_active: true,
  },
  {
    id: 'r2',
    name: 'War Remnants Museum',
    description: 'Powerful war history museum with outdoor military exhibits.',
    category: 'Attraction',
    distance_label: '15 min walk',
    hours_label: '7:30 AM – 6:00 PM',
    sort_order: 2,
    is_active: true,
  },
  {
    id: 'r3',
    name: 'Bến Thành Market',
    description: 'Iconic covered market for souvenirs, textiles, and street food.',
    category: 'Shopping',
    distance_label: '10 min walk',
    hours_label: '6:00 AM – 6:00 PM',
    sort_order: 3,
    is_active: true,
  },
  {
    id: 'r4',
    name: "L'Usine Cafe",
    description: 'Industrial-chic cafe with strong Vietnamese coffee and pastries.',
    category: 'Cafe',
    distance_label: '8 min walk',
    hours_label: '7:00 AM – 10:00 PM',
    sort_order: 4,
    is_active: true,
  },
  {
    id: 'r5',
    name: 'Bitexco Skydeck',
    description: 'Panoramic city views from the 49th-floor observation deck.',
    category: 'Attraction',
    distance_label: '12 min walk',
    hours_label: '9:30 AM – 9:30 PM',
    sort_order: 5,
    is_active: true,
  },
];

function isPortInUse(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const tester = net
      .createServer()
      .once('error', () => resolve(true))
      .once('listening', () => {
        tester.once('close', () => resolve(false)).close();
      })
      .listen(port, '127.0.0.1');
  });
}

export async function startMockSupabaseIfNeeded(): Promise<http.Server | null> {
  const active = await isPortInUse(PORT);
  if (active) {
    console.log(`Port ${PORT} is in use; assuming real Supabase instance is active.`);
    return null;
  }

  const server = http.createServer((req, res) => {
    const url = new URL(req.url ?? '/', `http://${req.headers.host}`);
    const pathname = url.pathname;

    res.setHeader('Content-Type', 'application/json');

    if (pathname.includes('/rest/v1/rooms')) {
      const roomParam = url.searchParams.get('room_number');
      if (roomParam === 'eq.offline' || roomParam === 'eq.error') {
        res.statusCode = 500;
        res.end(JSON.stringify({ message: 'Database connection failed', code: '500' }));
        return;
      }
      if (roomParam === 'eq.101') {
        if (req.headers.accept?.includes('vnd.pgrst.object')) {
          res.statusCode = 200;
          res.end(JSON.stringify(mockRoom101));
        } else {
          res.statusCode = 200;
          res.end(JSON.stringify([mockRoom101]));
        }
        return;
      }
      // Room 999 or other nonexistent room
      if (req.headers.accept?.includes('vnd.pgrst.object')) {
        res.statusCode = 200;
        res.end('null');
      } else {
        res.statusCode = 200;
        res.end(JSON.stringify([]));
      }
      return;
    }

    if (pathname.includes('/rest/v1/hotel_settings')) {
      if (req.headers.accept?.includes('vnd.pgrst.object')) {
        res.statusCode = 200;
        res.end(JSON.stringify(mockHotelSettings));
      } else {
        res.statusCode = 200;
        res.end(JSON.stringify([mockHotelSettings]));
      }
      return;
    }

    if (pathname.includes('/rest/v1/recommendations')) {
      res.statusCode = 200;
      res.end(JSON.stringify(mockRecommendations));
      return;
    }

    res.statusCode = 200;
    res.end(JSON.stringify([]));
  });

  await new Promise<void>((resolve) => server.listen(PORT, '127.0.0.1', () => resolve()));
  console.log(`Mock Supabase server running on http://127.0.0.1:${PORT}`);
  return server;
}
