const formAuthentication = document.querySelector('form')
const btnGoogleSingOut = document.querySelector("#google_singout");

btnGoogleSingOut.addEventListener("click", () => {
	google.accounts.id.disableAutoSelect();

	const email = localStorage.getItem("g-account-email");
	google.accounts.id.revoke(email, (done) => {
		localStorage.clear();
		location.reload();
	});
});

function handleCredentialResponse(response) {
	// Google token or ID_Token
	console.log("Google token", response.credential);

	const body = { gtoken: response.credential };

	fetch("http://localhost:3000/api/auth/google", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	})
		.then((response) => response.json())
		.then((response) => {
			console.log(response);
			localStorage.setItem("g-account-email", response.user.email);
			
			const { token } = response
			localStorage.setItem('x-token', token)
			window.location = 'chat.html'
		})
		.catch((err) => console.error(err));
}

formAuthentication.addEventListener('submit', (event) => {
	event.preventDefault()

	const formData = { }
	for (const element of formAuthentication.elements) {
		if(element.namespaceURI.length > 0) {
			formData[element.name] = element.value
		}
	}

	fetch('http://localhost:3000/api/auth/login', {
		method: 'POST',
		body: JSON.stringify(formData),
		headers: { 'Content-Type': 'application/json' }
	})
	.then(respone => respone.json())
	.then(data => {
		const { msg, token } = data;

		if(msg) return console.log(msg)

		console.log(data)
		localStorage.setItem('x-token', token)
		window.location = 'chat.html'
	})
	.catch(err => console.error(err))
})