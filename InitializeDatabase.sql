create database JamPool;

create table users_and_sessions(
	UserName varchar not null,
	SessionID varchar not null
);

create table songs(
	id serial,
	Description varchar not null,
	YTlink varchar not null,
	Votes integer not null,
	AddedWhen timestamptz not null,
	primary key (id)
);

insert into users_and_sessions(UserName, SessionID)
values
('UserOne', 'RAPXX'),
('UserTwo', 'RAPXX'),
('UserThree', 'RAPXX'),
('UserFour', 'ALTXX'),
('UserFive', 'ALTXX'),
('UserSix', 'ALTXX'),
('UserSeven', 'CNTRY'),
('UserEight', 'CNTRY'),
('UserNine', 'CNTRY');

insert into songs(Description, YTlink, Votes, AddedWhen)
values
('Travis Scott - SICKO MODE (Audio)', 'https://www.youtube.com/watch?v=d-JBBNg8YKs', 0, now()),
('Juice WRLD "Lucid Dreams (Forget Me)" (Official Audio)', 'https://www.youtube.com/watch?v=onbC6N-QGPc', 0, now()),
('Better Now', 'https://www.youtube.com/watch?v=0tTn95TLIaw', 0, now()),
('High Hopes', 'https://www.youtube.com/watch?v=GJY8OMJXRAk', 0, now()),
('Happier', 'https://www.youtube.com/watch?v=QgKYZWRH4DA', 0, now()),
('My Blood', 'https://www.youtube.com/watch?v=0a2ePzVCKuk', 0, now()),
('Meant to Be (feat. Florida Georgia Line)', 'https://www.youtube.com/watch?v=cU36WSG-XjI', 0, now()),
('Luke Combs - She Got the Best of Me (Audio)', 'https://www.youtube.com/watch?v=sD3kO4U5Oh4', 0, now()),
('Dan + Shay - Tequila (Audio)', 'https://www.youtube.com/watch?v=vTNWM0aD4JY', 0, now());