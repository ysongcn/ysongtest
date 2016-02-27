alter table app_owner drop constraint if exists fk_app_owner_company_id;
drop index if exists ix_app_owner_company_id;

drop table if exists app_company cascade;

drop table if exists app_owner cascade;

