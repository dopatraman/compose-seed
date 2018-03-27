lucca.view('pollbutton')
    .define(function(h, v, i, a) {
        return h.tml('div.pollbutton', {
            id: 'poll-' + i['id'], 
            onclick: a.select,
            classes: {
                selected: i.getInterests().indexOf(i['id']) > -1
            }}, [
            h.tml('span.callout', {id: 'poll-' + i['id']}, i['name']),
            h.tml('span.caption', {id: 'poll-' + i['id']}, i['caption'])
        ])
    })
    .registerActions('select')