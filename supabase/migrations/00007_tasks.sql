-- Tasks and reminders

CREATE TABLE tasks (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title       text NOT NULL,
  description text,
  status      task_status NOT NULL DEFAULT 'todo',
  source      task_source NOT NULL DEFAULT 'manual',
  due_date    date,
  completed_at timestamptz,
  assigned_to uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  planting_id uuid REFERENCES plantings(id) ON DELETE SET NULL,
  garden_id   uuid REFERENCES gardens(id) ON DELETE SET NULL,
  created_by  uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER tasks_updated_at
  BEFORE UPDATE ON tasks
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Auto-set completed_at when status changes to done
CREATE OR REPLACE FUNCTION public.set_task_completed()
RETURNS trigger AS $$
BEGIN
  IF NEW.status = 'done' AND OLD.status != 'done' THEN
    NEW.completed_at = now();
  END IF;
  IF NEW.status != 'done' THEN
    NEW.completed_at = NULL;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tasks_completed_at
  BEFORE UPDATE OF status ON tasks
  FOR EACH ROW EXECUTE FUNCTION public.set_task_completed();
