document.getElementById( "www7" ).addEventListener( "click", function() {
	try {
		// 別ページに移動させる
		window.location.href = "./Prototype6.html" ; 

	} catch( msg ) {
		// エラーを表示
		errorElement.className = "error" ;
		errorElement.textContent = msg ;
		console.error( msg ) ;

	}

});