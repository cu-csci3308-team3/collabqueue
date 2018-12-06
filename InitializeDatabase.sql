create database JamPool;

create table songs(
	id serial,
	Description varchar not null,
	YTlink varchar not null,
	Votes integer not null,
	AddedWhen timestamptz not null,
	primary key (id)
);