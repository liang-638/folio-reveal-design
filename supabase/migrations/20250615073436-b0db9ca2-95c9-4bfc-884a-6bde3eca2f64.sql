
-- Enable Row Level Security on both tables
ALTER TABLE public.portfolio_works ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_data ENABLE ROW LEVEL SECURITY;

-- Create policies for portfolio_works table
-- Allow everyone to read portfolio works (for public display)
CREATE POLICY "Anyone can view portfolio works" ON public.portfolio_works
    FOR SELECT USING (true);

-- Only authenticated users can insert portfolio works
CREATE POLICY "Authenticated users can insert portfolio works" ON public.portfolio_works
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Only authenticated users can update portfolio works
CREATE POLICY "Authenticated users can update portfolio works" ON public.portfolio_works
    FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Only authenticated users can delete portfolio works
CREATE POLICY "Authenticated users can delete portfolio works" ON public.portfolio_works
    FOR DELETE USING (auth.uid() IS NOT NULL);

-- Create policies for profile_data table
-- Allow everyone to read profile data (for public display)
CREATE POLICY "Anyone can view profile data" ON public.profile_data
    FOR SELECT USING (true);

-- Only authenticated users can insert profile data
CREATE POLICY "Authenticated users can insert profile data" ON public.profile_data
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Only authenticated users can update profile data
CREATE POLICY "Authenticated users can update profile data" ON public.profile_data
    FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Only authenticated users can delete profile data
CREATE POLICY "Authenticated users can delete profile data" ON public.profile_data
    FOR DELETE USING (auth.uid() IS NOT NULL);
