-- =========================================================================
-- MSI Ghana Events — Complete Database Schema for Supabase
-- Tables:
-- 1. public.girls_safe_space_registrations
-- 2. public.ride_your_flame_registrations
-- =========================================================================

-- -------------------------------------------------------------------------
-- 1. Girls' Safe Space Registrations Table
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.girls_safe_space_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    stop TEXT NOT NULL,
    session_time TEXT NOT NULL,
    reserve_bk1_kit BOOLEAN DEFAULT TRUE,
    reserve_breast_exam BOOLEAN DEFAULT TRUE,
    anonymous_question TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.girls_safe_space_registrations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Girls' Safe Space
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'girls_safe_space_registrations' 
        AND policyname = 'Allow public insertions for GSS registrations'
    ) THEN
        CREATE POLICY "Allow public insertions for GSS registrations" 
        ON public.girls_safe_space_registrations 
        FOR INSERT 
        TO anon, authenticated
        WITH CHECK (true);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'girls_safe_space_registrations' 
        AND policyname = 'Allow reading GSS registrations'
    ) THEN
        CREATE POLICY "Allow reading GSS registrations" 
        ON public.girls_safe_space_registrations 
        FOR SELECT 
        TO anon, authenticated
        USING (true);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'girls_safe_space_registrations' 
        AND policyname = 'Allow deleting GSS registrations'
    ) THEN
        CREATE POLICY "Allow deleting GSS registrations" 
        ON public.girls_safe_space_registrations 
        FOR DELETE 
        TO anon, authenticated
        USING (true);
    END IF;
END $$;


-- -------------------------------------------------------------------------
-- 2. Ride Your Flame (Cycling Fondo) Registrations Table
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.ride_your_flame_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_code TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    date_of_birth TEXT NOT NULL,
    category_id TEXT NOT NULL,
    category_name TEXT NOT NULL,
    start_wave TEXT NOT NULL,
    emergency_contact_name TEXT NOT NULL,
    emergency_contact_phone TEXT NOT NULL,
    amount NUMERIC(10,2) NOT NULL,
    currency TEXT NOT NULL DEFAULT 'GHS',
    payment_status TEXT NOT NULL DEFAULT 'confirmed',
    is_demo_record BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.ride_your_flame_registrations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Ride Your Flame
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'ride_your_flame_registrations' 
        AND policyname = 'Allow public insertions for RYF registrations'
    ) THEN
        CREATE POLICY "Allow public insertions for RYF registrations" 
        ON public.ride_your_flame_registrations 
        FOR INSERT 
        TO anon, authenticated
        WITH CHECK (true);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'ride_your_flame_registrations' 
        AND policyname = 'Allow reading RYF registrations'
    ) THEN
        CREATE POLICY "Allow reading RYF registrations" 
        ON public.ride_your_flame_registrations 
        FOR SELECT 
        TO anon, authenticated
        USING (true);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'ride_your_flame_registrations' 
        AND policyname = 'Allow deleting RYF registrations'
    ) THEN
        CREATE POLICY "Allow deleting RYF registrations" 
        ON public.ride_your_flame_registrations 
        FOR DELETE 
        TO anon, authenticated
        USING (true);
    END IF;
END $$;
