%#################################MOTORE DOMANDE
nextAnswer(1)
changeAnswere(X):-(retract(nextAnswer(_));assert(nextAnswer(X)))
resetAnswer:-changeAnswere(1)
next(TextAnswer):-(nextAnswer(X);answer(X,TextAnswer,_,_))
setResponse(X):-(nextAnswer(Z);answer(Z,_,X,Y);changeAnswere(Y))
