var solutions = [];

function solveProblem(tab, numPlayer, nbTenaille1, nbTenaille2){
		//parcour du tableau
		for (var i =0; i<19; i++){
			for (var j =0; j<19; j++){
					// Test des différentes solutions
					if (tab[i][j] == 0){
						isFive(i,j, tab, numPlayer, nbTenaille1, nbTenaille2);
					}
			}
		}
		return solutions;
	}

function isFive (xPos, yPos, tab, numPlayer, nbTenaille1, nbTenaille2){
			var poids = 0;
			var nbTenailleToWin = 0;
			for(var i=0; i<=1; i++){
				for(var j=-1; j<=1; j++){ // Generate <i,j> vectors for each non-negative direction
					if(i===0 && j===0) // Skip the vector <0,0>
						continue;
					if(i===0 && j===-1) // Skip the vector <0,-1>
						continue;
					var scalar = 1;
					var numberOfPieces = 0;
					var numberOfPiecesA = 0;
					var numberOfPiecesTenaille = 0;
					var nbTenaille = 0;
					var morePieces = true;
					var morePiecesA = true;
					var tenaille = true;
					var aligneA = true;
					var bloque = false;
					var aligne = true;
					var bloque2 = false;
					while(morePieces || morePiecesA || tenaille || aligneA || aligne){ // Check in the positive direction
						if(onBoard(xPos+i*scalar, yPos+j*scalar, tab)){ // If the next piece is on the board
							if(tab[xPos+i*scalar][yPos+j*scalar] == numPlayer){ // If the next piece is the same as the current player
								numberOfPieces++;
								scalar++;
								morePiecesA = false;
								if (numberOfPiecesTenaille == 2)
								{
									nbTenaille++;
									aligneA = false;
									aligne = false;
								}
								else{
									aligneA = false;
									aligne = false;
								}
								tenaille = false;
							}
							else if (tab[xPos+i*scalar][yPos+j*scalar] != 0){
								numberOfPiecesA++;
								numberOfPiecesTenaille++;
								scalar++;
								morePieces = false;
							}
							else if (tab[xPos+i*scalar][yPos+j*scalar] == 0 && numberOfPiecesA == 3 && morePiecesA){
								// 3 pions alignés et pas bloqué
								bloque = true;
								morePiecesA = false;
								aligneA = false;
								tenaille = false;
							}
							else if (tab[xPos+i*scalar][yPos+j*scalar] == 0 && numberOfPieces == 3 && morePieces){
								// 3 pions alignés et pas bloqué
								bloque2 = true;
								morePieces = false;
								aligne = false;
								tenaille = false;
							}
							/*else if (tab[xPos+i*scalar][yPos+j*scalar] == 0){
								morePiecesA = false;
								tenaille = false;
								aligne = false;
								aligneA = false;
								if (numberOfPieces > 0){
									morePieces = false;
								}
							}*/
							else{
								morePieces = false;
								morePiecesA = false;
								tenaille = false;
								aligneA = false;
								aligne = false;
							}
						}
						else{
							morePieces = false;
							morePiecesA = false;
							tenaille = false;
							aligneA = false;
							aligne = false;
						}
					}
					morePieces = true;
					morePiecesA = true;
					numberOfPiecesTenaille = 0;
					tenaille = true;
					scalar = 1;
					aligneA = true;
					while(morePieces || morePiecesA || tenaille || aligneA || aligne){ // Check in the negative direction
						if(onBoard(xPos+i*-scalar, yPos+j*-scalar, tab)){ // If the next piece is on the board
							if(tab[xPos+i*-scalar][yPos+j*-scalar] == numPlayer){ // If the next piece is the same as the current player
								numberOfPieces++;
								scalar++;
								morePiecesA = false;
								if (numberOfPiecesTenaille == 2)
								{
									nbTenaille++;
									aligneA = false;
									aligne = false;
								}
								else{
									aligneA = false;
									aligne = false;
								}
								tenaille = false;
							}
							else if(tab[xPos+i*-scalar][yPos+j*-scalar] != 0){ // If the next piece is the same as the current player
								numberOfPiecesA++;
								numberOfPiecesTenaille++;
								scalar++;
								morePieces = false;
							}
							else if (numberOfPiecesA == 3 &&tab[xPos+i*-scalar][yPos+j*-scalar] == 0 && morePiecesA){
								// 3 pions alignés et pas bloqué
								bloque = true;
								morePiecesA = false;
								aligneA = false;
								tenaille = false;
							}else if (numberOfPieces == 3 &&tab[xPos+i*-scalar][yPos+j*-scalar] == 0 && morePieces){
								// 3 pions alignés et pas bloqué
								bloque2 = true;
								morePieces = false;
								aligne = false;
								tenaille = false;
							}
							/*else if (tab[xPos+i*-scalar][yPos+j*-scalar] == 0){
								morePiecesA = false;
								tenaille = false;
								aligne = false;
								aligneA = false;
								if (numberOfPieces > 0){
									morePieces = false;
								}
							}*/
							else{
								morePieces = false;
								morePiecesA = false;
								tenaille = false;
								aligneA = false;
								aligne = false;
							}
						}
						else{
							morePieces = false;
							morePiecesA = false;
							tenaille = false;
							aligneA = false;
							aligne = false;
						}

					}
					if (numberOfPieces==4){
						// Je peux win direct avec une pente
						//solutions.push(new Array(xPos,yPos,1000));
						poids += 1000;
						//solutions.push(1);
						//return true;
					}
					if (numberOfPiecesA==4){
						//Il peut win direct avec une pente
						//solutions.push(new Array(xPos,yPos,800));
						poids += 800;
					}
					if (nbTenaille > 0) {
						//Je peux faire une tenaille
						//solutions.push(new Array(xPos,yPos,500*nbTenaille));
						nbTenailleToWin += nbTenaille;
						poids += 500*nbTenaille;
					}
					if (bloque){
						// advairssaire 3 pions aligné et pas bloqués
						//solutions.push(new Array(xPos,yPos,400));
						poids += 400;
					}
					if (bloque2){
						// on a 3 pions aligné et pas bloqués
						//solutions.push(new Array(xPos,yPos,300));
						poids += 300;
					}
					if (numberOfPieces > 0){
						// on cherche la ou on a le plus de pions pour les alignés 
						poids += 10*numberOfPieces;
					}
					
				}
			}
			if (poids > 0){
				if (numPlayer == 1){
				 	nbTenailleToWin += nbTenaille1;
				}
				else {
					nbTenailleToWin += nbTenaille2;
				}
				if (nbTenailleToWin >= 5) {
					poids += 1000;
				}
				solutions.push(new Array(xPos,yPos,poids));
			}
			//return thereIsFive;
		}

function onBoard(xPos, yPos, tab){
		if(yPos<0 || yPos>tab[0].length-1 || xPos<0 || xPos>tab.length-1) {
			return false;
		}
		else{
			return true;
		}
}