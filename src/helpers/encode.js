
var converter = require('number-to-words');

export async function encodeAssociations(associations) {
    if (Array.isArray(associations)) {
        let str = associations[0];

        for (let i = 1; i < associations.length; i++) {
            str += ',' + associations[i];
        }
        return str;
    } else {
        return associations
    }
} 

export async function formatDate(ISOString) {
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'April',
        'May',
        'June',
        'July',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec'
    ];

    var str = ''
    var date = new Date(ISOString);
    let day = date.getDate();
    let month = months[date.getMonth()];
    let year = date.getFullYear();
    let time = formatAMPM(date);

    str += day + ' ' + month + ' ' + year + ', ' + time;

    return str;
}

export async function convertToTimestamp(ISOString) {
    return Math.round(new Date(ISOString).getTime() / 1000);
}

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

export function modifyImage(imageData) {
    let image = null;
    image.uri = imageData.path;
    image.mime = imageData.mime
    image.filename = imageData.filename;

    return image;
}

export function numberToWords(number){
    return converter.toWords(number);
}

export function capitalizeWords(string) {
    return string.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

export function formatCamelCase(text) {
    return text.replace(/([A-Z])/g, ' $1')
        .replace(/^./, function (str) { return str.toUpperCase(); })
}


