%---------------------NUMERO FORTUNATO
luckyNumber(0).
addToluckyNumber(X):-retract(luckyNumber(Y)),Z is X+Y,assert(luckyNumber(Z));
%---------------------GATTO
answer(1,'Hai un gatto?','si',2):-addToluckyNumber(1),!.
answer(1,'Hai un gatto?','no',3):-!.
answer(2,'Quanti colori ha il tuo gatto?',X,4):-X>2,addToluckyNumber(X),!.
answer(2,'Quanti colori ha il tuo gatto?',X,5):-X<2,!.
answer(2,'Quanti colori ha il tuo gatto?',2,3):-addToluckyNumber(2),!.
answer(4,'Il tuo gatto � un maschio?','si',3):-!.
answer(4,'Il tuo gatto � un maschio?','no',5):-!.
answer(5,'Il nome della tua gatta inizia con la M?','no',3):-addToluckyNumber(1),!.
answer(5,'Il nome della tua gatta inizia con la M?','si',3):-addToluckyNumber(10),!.
%---------------------CANE
answer(3,'Ti piacerebbe avere un cane o ne hai uno?','si',2).
answer(3,'Ti piacerebbe avere un cane o ne hai uno?','no',2).