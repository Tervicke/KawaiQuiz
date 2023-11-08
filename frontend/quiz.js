async function getQuestions(){
	const url = "http://127.0.0.1:5000/"
	let data = await (await fetch(url)).json();
	console.log(data)
	return data
}

