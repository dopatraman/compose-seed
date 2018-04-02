/**
 * Front page
 */

lucca.model('frontpage')
    .define({
        authCTA: 'Auth'
    })
    .handle('sendAuthRequest', function(prevState) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/digmaps', true);
        xhr.send();
        console.log('Sent auth request!');
    })

lucca.view('frontpage')
    .define(function(h, v, i, a) {
        return h.tml('div.frontpage.container', {}, [
            h.tml('div.buttonContainer', {}, [
                h.tml('div.button.auth', {onclick: a.auth}, [i['authCTA']])
            ]),
            h.tml('div.buttonContainer', {}, [
                h.tml('div.button.dig', {}, ['Dig'])
            ])
        ])
    })
    .registerActions('auth')

lucca.vm('frontpage')
    .model('frontpage')
    .view('frontpage')
    .accept({
        auth: 'sendAuthRequest'
    });