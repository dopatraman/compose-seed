/**
 * Front page
 */

lucca.model('frontpage')
    .define({
        userEmail: '',
        interestSelections: [],
        hideForm: false,
        CTA: 'Interested? Sign up to find out when we launch.'
    })
    .handle('sendEmail', function(prevState) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/data', true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify({
            userEmail: prevState.userEmail,
            interests: prevState.interestSelections
        }));
        prevState.CTA = 'Thank you! You\'ll be hearing from us soon!';
        prevState.hideForm = true;
    })
    .handle('updateUserEmail', function(prevState, evt) {
        prevState.userEmail = evt.srcElement.value;
    })
    .handle('updateInterestSelection', function(prevState, evt) {
        var id = parseInt(evt.srcElement.id.split('poll-')[1]);
        var idx = prevState.interestSelections.indexOf(id);
        if (!isNaN(id) && idx == -1) {
            prevState.interestSelections.push(id);
        }
        else if (idx > -1) {
            prevState.interestSelections.splice(idx, 1);
        }
    });

lucca.view('frontpage')
    .define(function(h, v, i, a) {
        return h.tml('div.frontpage.container', {}, [
            h.tml('div.frontpage.row', {}, [
                v('placeholderShort', {getData: function(){}}),
                v('placeholderShort', {getData: function(){}}),
                v('placeholderShort', {getData: function(){}})
            ]),
            h.tml('div.frontpage.row', {}, [
                h.tml('div.frontpage.mainPost', {}, [
                    h.tml('div.frontpage.cta', {}, [i['CTA']]),
                    h.tml('div.frontpage.contact', {
                        classes: {
                            hidden: i['hideForm']
                        },
                    }, [
                        h.tml('input.email', {
                            type:'text',
                            onkeyup: a.changeUserEmail}, []),
                        h.tml('div.button.submit', {onclick: a.submitEmail}, ['Send!'])
                    ])
                ]),
                h.tml('div.frontpage.poll', {}, [
                    h.tml('div.frontpage.pollRow', {}, [
                        v('pollbutton', {getData: function() {
                            return { id: 1, name: 'Ne', caption:'News', getInterests: function() {return i['interestSelections']}}
                        }}),
                        v('pollbutton', {getData: function() {
                            return { id: 2, name: 'Fo', caption:'Food', getInterests: function() {return i['interestSelections']}}
                        }})
                    ]),
                    h.tml('div.frontpage.pollRow', {}, [
                        v('pollbutton', {getData: function() {
                            return { id: 3, name: 'Pa', caption:'Parking', getInterests: function() {return i['interestSelections']}}
                        }}),
                        v('pollbutton', {getData: function() {
                            return { id: 4, name: 'Ot', caption:'Other', getInterests: function() {return i['interestSelections']}}
                        }})
                    ])
                ])
            ]),
            h.tml('div.frontpage.row', {}, [
                v('placeholderTall', {getData: function(){}}),
                v('placeholderTall', {getData: function(){}}),
                v('placeholderTall', {getData: function(){}}),
                v('placeholderTall', {getData: function(){}})
            ])
        ])
    })
    .registerActions('submitEmail', 'changeUserEmail', 'getEmail')

lucca.vm('frontpage')
    .model('frontpage')
    .view('frontpage')
    .accept({
        submitEmail: 'sendEmail',
        changeUserEmail: 'updateUserEmail',
        getEmail: 'getEmail',
        select: 'updateInterestSelection'
    });