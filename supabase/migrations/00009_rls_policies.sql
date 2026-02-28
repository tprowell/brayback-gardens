-- Row Level Security policies
-- Household model: all authenticated users can read all data
-- User_id checks on INSERT for audit trail

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE gardens ENABLE ROW LEVEL SECURITY;
ALTER TABLE garden_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE plants ENABLE ROW LEVEL SECURITY;
ALTER TABLE plantings ENABLE ROW LEVEL SECURITY;
ALTER TABLE harvests ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

-- Profiles
CREATE POLICY "Authenticated users can view all profiles"
  ON profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE TO authenticated USING (id = auth.uid());

-- Gardens
CREATE POLICY "Authenticated users can view all gardens"
  ON gardens FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert gardens"
  ON gardens FOR INSERT TO authenticated WITH CHECK (created_by = auth.uid());
CREATE POLICY "Authenticated users can update gardens"
  ON gardens FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete gardens"
  ON gardens FOR DELETE TO authenticated USING (true);

-- Garden features
CREATE POLICY "Authenticated users can view all features"
  ON garden_features FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert features"
  ON garden_features FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update features"
  ON garden_features FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete features"
  ON garden_features FOR DELETE TO authenticated USING (true);

-- Plants
CREATE POLICY "Authenticated users can view all plants"
  ON plants FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert plants"
  ON plants FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update plants"
  ON plants FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete non-default plants"
  ON plants FOR DELETE TO authenticated USING (is_default = false);

-- Plantings
CREATE POLICY "Authenticated users can view all plantings"
  ON plantings FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert plantings"
  ON plantings FOR INSERT TO authenticated WITH CHECK (created_by = auth.uid());
CREATE POLICY "Authenticated users can update plantings"
  ON plantings FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete plantings"
  ON plantings FOR DELETE TO authenticated USING (true);

-- Harvests
CREATE POLICY "Authenticated users can view all harvests"
  ON harvests FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert harvests"
  ON harvests FOR INSERT TO authenticated WITH CHECK (created_by = auth.uid());
CREATE POLICY "Authenticated users can update harvests"
  ON harvests FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete harvests"
  ON harvests FOR DELETE TO authenticated USING (true);

-- Tasks
CREATE POLICY "Authenticated users can view all tasks"
  ON tasks FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert tasks"
  ON tasks FOR INSERT TO authenticated WITH CHECK (created_by = auth.uid());
CREATE POLICY "Authenticated users can update tasks"
  ON tasks FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete tasks"
  ON tasks FOR DELETE TO authenticated USING (true);

-- Notes
CREATE POLICY "Authenticated users can view all notes"
  ON notes FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert notes"
  ON notes FOR INSERT TO authenticated WITH CHECK (created_by = auth.uid());
CREATE POLICY "Authenticated users can update notes"
  ON notes FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete notes"
  ON notes FOR DELETE TO authenticated USING (true);
