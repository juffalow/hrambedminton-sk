type ID = string;

interface ClubStats {
  activities: number;
  distance: number;
  elevation_gain: number;
  kudos: number;
}

interface Club {
  id: ID;
  name: string;
  description: string;
  country: string;
  city: string;
  member_count: number;
  profile: string;
  cover_photo: string;
  profile_medium: string;
  cover_photo_small: string;
  yearlyStats: Record<string, ClubStats>;
  monthlyStats: (Record<string, ClubStats> & { id: ID; sk: ID })[];
  weeklyStats: (Record<string, ClubStats> & { id: ID; sk: ID })[];
}

interface Athlete {
  id: ID;
  firstname: string;
  lastname: string;
  city: string;
  country: string;
  sex: 'M' | 'F';
  stats: {
    ytd_ride_totals: {
      count: number;
      elapsed_time: number;
      distance: number;
      elevation_gain: number;
      moving_time: number;
    };
    ytd_run_totals: {
      count: number;
      elapsed_time: number;
      distance: number;
      elevation_gain: number;
      moving_time: number;
    };
  };
}

interface User {
  id?: ID;
  username?: string;
  email?: string;
  name?: string;
  accessToken: string;
  idToken: string;
  meta?: Record<string, string | number | boolean>;
}

interface Activity {
  id: ID;
  name: string;
  description: string;
  distance: number;
  total_elevation_gain: number;
  kudos: number;
  start_date: string;
  start_date_local: string;
  type: string;
  sport_type: string;
  elapsed_time: number;
}
