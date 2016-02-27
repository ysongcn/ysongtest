create table app_company (
  id                            bigserial not null,
  owner                         varchar(255),
  name                          varchar(255),
  address                       varchar(255),
  city                          varchar(255),
  country                       varchar(255),
  email                         varchar(255),
  phone                         varchar(255),
  constraint pk_app_company primary key (id)
);

create table app_owner (
  id                            bigserial not null,
  company_id                    bigint,
  name                          varchar(255),
  constraint pk_app_owner primary key (id)
);

alter table app_owner add constraint fk_app_owner_company_id foreign key (company_id) references app_company (id) on delete restrict on update restrict;
create index ix_app_owner_company_id on app_owner (company_id);

