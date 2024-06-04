create extension if not exists "moddatetime" with schema "extensions";


alter table "public"."events" drop constraint "public_events_event_time_id_fkey";

alter table "public"."events" drop constraint "public_events_event_type_id_fkey";

alter table "public"."events" drop column "event_time_id";

alter table "public"."events" drop column "event_type_id";

alter table "public"."events" add column "event_time" text;

alter table "public"."events" add column "event_type" text;

alter table "public"."events" alter column "client_id" set not null;

alter table "public"."pets" drop column "photo_public_url";

alter table "public"."users" drop column "avatar_public_url";

create policy "Allow Authenticated Users"
on "public"."addresses"
as permissive
for all
to authenticated
using (true)
with check (true);


create policy "Authenticated User have access "
on "public"."home_info"
as permissive
for all
to authenticated
using (true)
with check (true);


create policy "Enable insert for authenticated users only"
on "public"."pets"
as permissive
for all
to authenticated
using (true)
with check (true);


create policy "Authenticated User have access "
on "public"."phone_numbers"
as permissive
for all
to authenticated
using (true)
with check (true);


create policy "Authenticated users can modify"
on "public"."veterinarians"
as permissive
for all
to authenticated
using (true)
with check (true);


CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION moddatetime('updated_at');


