\c jampool

create table users_and_sessions(
	UserName varchar not null,
	SessionID varchar not null
);

create table songs(
	id serial,
	Description varchar not null,
	YTlink varchar not null,
	SessionID varchar not null,
	Votes integer not null,
	AddedByUser varchar not null,
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

insert into songs(Description, YTlink, SessionID, Votes, AddedByUser, AddedWhen)
values
('Travis Scott - SICKO MODE (Audio)', 'https://www.youtube.com/watch?v=d-JBBNg8YKs', 'RAPXX', 8, 'UserOne', now()),
('Juice WRLD "Lucid Dreams (Forget Me)" (Official Audio)', 'https://www.youtube.com/watch?v=onbC6N-QGPc', 'RAPXX', 0, 'UserTwo', now()),
('Better Now', 'https://www.youtube.com/watch?v=0tTn95TLIaw', 'RAPXX', 0, 'UserThree', now()),
('High Hopes', 'https://www.youtube.com/watch?v=GJY8OMJXRAk', 'ALTXX', 5, 'UserFour', now()),
('Happier', 'https://www.youtube.com/watch?v=QgKYZWRH4DA', 'ALTXX', 1, 'UserFive', now()),
('My Blood', 'https://www.youtube.com/watch?v=0a2ePzVCKuk', 'ALTXX', 0, 'UserSix', now()),
('Meant to Be (feat. Florida Georgia Line)', 'https://www.youtube.com/watch?v=cU36WSG-XjI', 'CNTRY', 2, 'UserSeven', now()),
('Luke Combs - She Got the Best of Me (Audio)', 'https://www.youtube.com/watch?v=sD3kO4U5Oh4', 'CNTRY', 0, 'UserEight', now()),
('Dan + Shay - Tequila (Audio)', 'https://www.youtube.com/watch?v=vTNWM0aD4JY', 'CNTRY', 1, 'UserNine', now());