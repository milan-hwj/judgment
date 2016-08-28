'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @author     milan(white gourd angel)
 * @describe   judgment (https://www.npmjs.com/package/judgment)
 */

var Judgment = function () {
    function Judgment(opt) {
        _classCallCheck(this, Judgment);

        /**
          * @param
          *     opt: {
          *         conditions: [
          *             () => { if(xxx) {return true;} return false;},
          *             () => { if(xxx) {return true;} return false;},
          *             () => { if(xxx) {return true;} return false;},
          *             () => { if(xxx) {return true;} return false;}
          *         ],
          *         relations: {
          *             'resultA': ['1010', '1011', '11**'],
          *             'resultB': ['1010', '1010', '11**']
          *         }
          *     }
          */
        this.opt = opt;
    }

    _createClass(Judgment, [{
        key: 'run',
        value: function run() {
            // 执行判断
            var conditions = this.opt.conditions;
            var relations = this.opt.relations;
            var result = [];
            for (var r in relations) {
                if (this._isPass(relations[r])) {
                    result.push(r);
                    if (this.opt.matchOnce) {
                        break;
                    }
                }
            }
            return result;
        }
    }, {
        key: '_isPass',
        value: function _isPass(relation) {
            var result = false;
            for (var c in relation) {
                if (this._isPassByFunctions(relation[c])) {
                    result = true;
                    break;
                }
            }
            return result;
        }
    }, {
        key: '_isPassByFunctions',
        value: function _isPassByFunctions(functionsStr) {
            // functionsStr 101*
            var result = true;
            var conditions = this.opt.conditions;
            for (var f in functionsStr) {
                if (functionsStr[f] === '*') {
                    continue;
                } else {
                    var passResult = functionsStr[f];
                    var checkResult = conditions[f]();
                    if (checkResult === true) {
                        checkResult = '1';
                    } else if (checkResult === false) {
                        checkResult = '0';
                    }
                    // judgment
                    if (checkResult.toString() !== passResult) {
                        result = false;
                        break;
                    }
                }
            }
            return result;
        }
    }]);

    return Judgment;
}();

var judgmentCreater = function judgmentCreater(opt) {
    return new Judgment(opt);
};

exports.default = judgmentCreater;