document.getElementById( "www13" ).addEventListener( "click", function() {
	try {
		// 別ページに移動させる
		window.location.href = "./Prototype99.html" ; 

	} catch( msg ) {
		// エラーを表示
		errorElement.className = "error" ;
		errorElement.textContent = msg ;
		console.error( msg ) ;

	}

});