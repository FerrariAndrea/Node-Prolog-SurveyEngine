%#################################MOTORE DOMANDE
nextAnswer(1)
changeAnswere(X):-(retract(nextAnswer(_)),assert(nextAnswer(X)))
resetAnswer:-(changeAnswere(1))
getActualAnswer(Ans):-(nextAnswer(X),clause(answer(X,Ans,_,_),_))
setResponse(X):-(nextAnswer(Z),answer(Z,_,X,Y),changeAnswere(Y))
getResult('no result as default')
%###################################
%getValidAnswer(X):-(nextAnswer(Y),clause(answer(Y,_,X,_),Z))