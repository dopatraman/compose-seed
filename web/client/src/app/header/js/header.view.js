/**
 * Header view
 */

lucca.view('header')
    .define(function(h, v, i, a) {
        return h.tml('div.header.container', {}, [
            h.tml('div.header.center', {}, [
                h.tml('div.title.text', {}, [i['title']]),
                h.tml('div.title.underscore', {}, [
                    h.tml('div.hr.left', {}, []),
                    h.tml('div.x', {}, ['X']),
                    h.tml('div.hr.right', {}, [])
                ])
            ]),
        ])
    })
    ;