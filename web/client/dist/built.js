/**
 * Main header view
 */

lucca.model('header')
    .define({
        title: 'Palms Post'
    })
    ;
/**
 * Header view
 */

lucca.view('header')
    .define(function(h, v, i, a) {
        return h.tml('div.header.container', {}, [
            h.tml('div.categories.left', {}, [
                h.tml('div.category', {}, ['About']),
                h.tml('div.category', {}, ['Contact'])
            ]),
            h.tml('div.title.container', {}, [
                h.tml('div.title.text', {}, [i['title']]),
                h.tml('div.title.underscore', {}, [
                    h.tml('div.hr.left', {}, []),
                    h.tml('div.underscore.x', {}, ['X']),
                    h.tml('div.hr.right', {}, [])
                ])
            ]),
            h.tml('div.categories.right', {}, [
                h.tml('div.category', {}, ['News']),
                h.tml('div.category', {}, ['Food'])
            ])
        ])
    })
    ;
/**
 * Header Receiver
 */

lucca.vm('header')
    .model('header')
    .view('header')
    .accept()
    ;
window.onload = function() {
    lucca.init(document.body);
    lucca.tick();
}