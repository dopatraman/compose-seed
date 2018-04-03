/**
 * Front page
 */

lucca.model('frontpage')
    .define({
        authCTA: 'Dig!',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zipcode: '',
        digResults: ''
    })
    .handle('sendAuthRequest', function(prevState) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/digmaps', true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                prevState.digResults = parseToCSV(JSON.parse(xhr.response), '45 Roxy Ave');
            }
        }
        xhr.send(JSON.stringify({
            address1: prevState.address1,
            address2: prevState.address2,
            city: prevState.city,
            state: prevState.state,
            zipcode: prevState.zipcode
        }));
        console.log('Sent auth request!');
    })
    .handle('updateAddress1', function(prevState, evt) {
        var val = evt.srcElement.value;
        if (val) {
            prevState.address1 = val;
        }
    })
    .handle('updateAddress2', function(prevState, evt) {
        var val = evt.srcElement.value;
        if (val) {
            prevState.address2 = val;
        }
    })
    .handle('updateCity', function(prevState, evt) {
        var val = evt.srcElement.value;
        if (val) {
            prevState.city = val;
        }
    })
    .handle('updateState', function(prevState, evt) {
        var val = evt.srcElement.value;
        if (val.length >= 2) {
            prevState.state = val.slice(0, 2).toUpperCase();
        }
    })
    .handle('updateZipcode', function(prevState, evt) {
        var val = evt.srcElement.value;
        if (val.length >= 5) {
            prevState.zipcode = val.slice(0,5);
        }
    })

lucca.view('frontpage')
    .define(function(h, v, i, a) {
        return h.tml('div.frontpage.container', {}, [
            h.tml('div.digFormContainer', {}, [
                h.tml('div.digForm', {}, [
                    h.tml('div.formElement.address1', {}, [
                        h.tml('div.formLabel.address1', {}, ['Address 1']),
                        h.tml('input.formInput.address1', {type: 'text', onkeyup: a.updateAddress1}, [])
                    ]),
                    h.tml('div.formElement.address2', {}, [
                        h.tml('div.formLabel.address2', {}, ['Address 2']),
                        h.tml('input.formInput.address2', {type: 'text', onkeyup: a.updateAddress2}, [])
                    ]),
                    h.tml('div.formElement.city', {}, [
                        h.tml('div.formLabel.city', {}, ['City']),
                        h.tml('input.formInput.city', {type: 'text', onkeyup: a.updateCity}, [])
                    ]),
                    h.tml('div.formElement.state', {}, [
                        h.tml('div.formLabel.state', {}, ['State']),
                        h.tml('input.formInput.state', {type: 'text', onkeyup: a.updateState}, [])
                    ]),
                    h.tml('div.formElement.zipcode', {}, [
                        h.tml('div.formLabel.zipcode', {}, ['Zipcode']),
                        h.tml('input.formInput.zipcode', {type: 'text', onkeyup: a.updateZipcode}, [])
                    ])
                ]),
                h.tml('div.buttonContainer', {}, [
                    h.tml('div.button.auth', {onclick: a.dig}, [i['authCTA']])
                ])
            ]),
            h.tml('div.digResultsContainer', {}, [
                h.tml('div.digResults', {}, [i['digResults']])
            ])
        ])
    })
    .registerActions('dig', 'updateAddress1', 'updateAddress2', 'updateCity', 'updateState', 'updateZipcode')

lucca.vm('frontpage')
    .model('frontpage')
    .view('frontpage')
    .accept({
        dig: 'sendAuthRequest',
        updateAddress1: 'updateAddress1',
        updateAddress2: 'updateAddress2',
        updateCity: 'updateCity',
        updateState: 'updateState',
        updateZipcode: 'updateZipcode'
    });
 /***************** HELPERS ********************/
 var CSVPoint = function(id, group, long, lat, street) {
     this.id = id;
     this.group = group;
     this.long = long;
     this.lat = lat;
     this.street = street;
     console.log(this.street);
     this.render = function() {
         return [this.id, this.group, this.long, this.lat, this.street].join(',');
     }
 }
 function parseToCSV(segments, street) {
    var acc = [];
    for (var i = 0; i < segments.length; i++) {
        var group = i + 1;
        var id = group * 2;
        if (i % 2 == 0) {
            id -= 1;
        }
        acc.push(new CSVPoint(group*2 - 1, group, segments[i][0][0], segments[i][0][1], street));
        acc.push(new CSVPoint(group*2, group, segments[i][1][0], segments[i][1][1], street));
    }
    var lines = acc.map((el) => {return el.render()});
    lines.unshift('id,group,long(x),lat(y),street');
    return lines.join('\n');
 }