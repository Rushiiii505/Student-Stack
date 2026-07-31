import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { initialPerks } from '@/data/mockPerks';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export async function GET(request: Request) {
  if (!supabaseUrl || !supabaseAnonKey) {
    // Return initialPerks fallback directly with status 200
    return NextResponse.json(initialPerks);
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const query = searchParams.get('q');

  let dbQuery = supabase.from('perks').select('*').order('name');

  if (category && category !== 'All') {
    dbQuery = dbQuery.eq('category', category);
  }

  if (query) {
    dbQuery = dbQuery.ilike('name', `%${query}%`);
  }

  const { data, error } = await dbQuery;

  if (error) {
    return NextResponse.json(initialPerks);
  }

  return NextResponse.json(data);
}
