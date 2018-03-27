/**
 * Header view
 */

lucca.view('header')
    .define(function(h, v, i, a) {
        return h.tml('div.header.container', {}, [
            h.tml('div.header.left', {}, [
                h.tml('div.categoryRow.categoryRowTop', {}, [
                    h.tml('div.wing.wingTop', {}, []),
                    h.tml('div.category', {}, ['About'])
                ]),
                h.tml('div.categoryRow.categoryRowBottom', {}, [
                    h.tml('div.wing.wingBottom', {}, []),
                    h.tml('div.category', {}, ['Contact'])
                ])
            ]),
            h.tml('div.header.center', {}, [
                h.tml('div.title.text', {}, [i['title']]),
                h.tml('div.title.underscore', {}, [
                    h.tml('div.hr.left', {}, []),
                    h.tml('div.x', {}, ['X']),
                    h.tml('div.hr.right', {}, [])
                ])
            ]),
            h.tml('div.header.right', {}, [
                h.tml('div.categoryRow.categoryRowTop', {}, [
                    h.tml('div.category', {}, ['News']),
                    h.tml('div.wing.wingTop', {}, [])
                ]),
                h.tml('div.categoryRow.categoryRowBottom', {}, [
                    h.tml('div.category', {}, ['Weather']),
                    h.tml('div.wing.wingBottom', {}, [])
                ])
            ])
        ])
    })
    ;