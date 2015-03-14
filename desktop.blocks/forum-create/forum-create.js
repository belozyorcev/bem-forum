modules.define(
    'forum-create',
    ['i-bem__dom', 'markdown'],
    function (provide, BEMDOM, markdown) {

        provide(BEMDOM.decl(this.name, {

            onSetMod: {
                js: {
                    inited: function () {
                        this._switcher = this.findBlockInside('radio-group');
                        this._source   = this.findBlockInside('textarea');
                        this._preview  = this.findBlockInside('preview');
                        this._radioPrev = this._switcher._getRadioByVal('preview');

                        this._switcher.on('change', this._switch, this);
                        this._source.on('change', this._checkSource, this);
                    }
                }
            },

            _switch: function () {
                var view = this._switcher.getVal();

                this.delMod(this.elem('view'), 'visible');
                this.setMod(this.elem('view', 'type', view), 'visible');

                if (view === 'preview') {
                    this._preview.domElem.html(markdown.render(this._source.getVal()));
                }
            },

            _checkSource: function () {
                var text = this._source.getVal();

                if (text.length === 0) {
                    this._radioPrev.setMod('disabled', true);
                } else {
                    this._radioPrev.setMod('disabled', false);
                }
            }

        }));

    }
);
