/*
  # Create Diya Requests Table

  1. New Tables
    - `diya_requests`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `name` (text)
      - `phone` (text)
      - `recipient_name` (text)
      - `relationship` (text)
      - `payment_status` (text)
      - `video_url` (text)
      - `whatsapp_sent` (boolean)

  2. Security
    - Enable RLS on `diya_requests` table
    - Add policies for authenticated users to read their own data
    - Add policies for admin to read all data
*/

CREATE TABLE IF NOT EXISTS diya_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  name text NOT NULL,
  phone text NOT NULL,
  recipient_name text NOT NULL,
  relationship text NOT NULL,
  payment_status text DEFAULT 'pending',
  video_url text,
  whatsapp_sent boolean DEFAULT false
);

ALTER TABLE diya_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own requests"
  ON diya_requests
  FOR SELECT
  TO authenticated
  USING (phone = auth.jwt()->>'phone');

CREATE POLICY "Admin can read all requests"
  ON diya_requests
  FOR ALL
  TO authenticated
  USING (auth.jwt()->>'role' = 'admin');