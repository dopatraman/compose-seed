lucca.view('placeholderShort')
    .define(function(h,v,i,a) {
        return h.tml('div.frontpage.placeholder.short', {}, [
            h.tml('div.frontpage.placeholderImg', {}, []),
            h.tml('div.frontpage.placeholderText', {}, []),
            h.tml('div.frontpage.placeholderText', {}, []),
            h.tml('div.frontpage.placeholderText', {}, [])
        ]);
    });

lucca.view('placeholderTall')
    .define(function(h,v,i,a) {
        return h.tml('div.frontpage.placeholder.tall', {}, [
            h.tml('div.frontpage.placeholderImg', {}, []),
            h.tml('div.frontpage.placeholderText', {}, []),
            h.tml('div.frontpage.placeholderText', {}, []),
            h.tml('div.frontpage.placeholderText', {}, []),
            h.tml('div.frontpage.placeholderText', {}, []),
            h.tml('div.frontpage.placeholderText', {}, []),
            h.tml('div.frontpage.placeholderText', {}, []),
            h.tml('div.frontpage.placeholderText', {}, []),
            h.tml('div.frontpage.placeholderText', {}, [])
        ]);
    });