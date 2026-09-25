-- Migration: Create girls_safe_space_registrations table
-- Date: 2026-09-25

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

-- Enable Row Level Security (RLS)
ALTER TABLE public.girls_safe_space_registrations ENABLE ROW LEVEL SECURITY;

-- Allow public (anon and authenticated) clients to submit registrations
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'girls_safe_space_registrations' 
        AND policyname = 'Allow public insertions for registrations'
    ) THEN
        CREATE POLICY "Allow public insertions for registrations" 
        ON public.girls_safe_space_registrations 
        FOR INSERT 
        TO anon, authenticated
        WITH CHECK (true);
    END IF;
END $$;

-- Allow anon and authenticated users / dashboard administrators to view registrations
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'girls_safe_space_registrations' 
        AND policyname = 'Allow reading registrations'
    ) THEN
        CREATE POLICY "Allow reading registrations" 
        ON public.girls_safe_space_registrations 
        FOR SELECT 
        TO anon, authenticated
        USING (true);
    END IF;
END $$;
