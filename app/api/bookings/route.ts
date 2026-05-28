import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log('BODY:', body);

    const { data, error } = await supabase
      .from('Bookings')
      .insert([body])
      .select();

    console.log('DATA:', data);
    console.log('ERROR:', error);

    if (error) {
  console.log('SUPABASE ERROR:', error);

  return Response.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
    });

  } catch (err) {
    console.log(err);

    return Response.json(
      { error: 'Server fout' },
      { status: 500 }
    );
  }
}