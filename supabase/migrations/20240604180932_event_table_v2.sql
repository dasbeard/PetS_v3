alter table "public"."events" drop column "photo_public_urls";

create policy "Enable insert for authenticated users only"
on "public"."events"
as permissive
for all
to authenticated
using (true)
with check (true);



