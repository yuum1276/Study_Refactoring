"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function statement(invoice, plays) {
    var totalAmount = 0;
    var volumeCredits = 0;
    var result = "\uCCAD\uAD6C \uB0B4\uC5ED (\uACE0\uAC1D\uBA85: ".concat(invoice.customer, ")\n");
    var format = new Intl.NumberFormat("es-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format;
    for (var _i = 0, _a = invoice.performances; _i < _a.length; _i++) {
        var perf = _a[_i];
        var play = plays[perf.playID];
        var thisAmount = 0;
        switch (play.type) {
            case "tragedy": // 비극
                thisAmount = 40000;
                if (perf.audience > 30) {
                    thisAmount += 1000 * (perf.audience - 30);
                }
                break;
            case "comedy": // 희극
                thisAmount = 30000;
                if (perf.audience > 20) {
                    thisAmount += 10000 + 500 * (perf.audience - 20);
                }
                thisAmount += 300 * perf.audience;
                break;
            default:
                throw new Error("\uC54C \uC218 \uC5C6\uB294 \uC7A5\uB974 : ".concat(play.type));
        }
        //포인트를 적립한다.
        volumeCredits += Math.max(perf.audience - 30, 0);
        if (play.type === "comedy")
            volumeCredits += Math.floor(perf.audience / 5);
        //청구 내역을 출력한다.
        result += "  ".concat(play.name, " : ").concat(format(thisAmount / 100), " (").concat(perf.audience, "\uC11D)\n");
        totalAmount += thisAmount;
    }
    result += "\uCD1D\uC561 : ".concat(format(totalAmount / 100), "\n");
    result += "\uC801\uB9BD \uD3EC\uC778\uD2B8 : ".concat(volumeCredits, "\uC810\n");
    return result;
}
