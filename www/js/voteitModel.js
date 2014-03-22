

    var oVotesRadious = [{
            userId: null,
            choice: 'Yes'
        }, {
            userId: null,
            choice: 'No'
        }, 
        {
            userId: null,
            choice: 'Yes'
        }, 
        {
            userId: null,
            choice: 'Yes'
        }, 
        {
            userId: null,
            choice: 'Just for the demo'
        }];

    var oVotesTheme = [{
            userId: null,
            choice: null
        }, {
            userId: null,
            choice: null
        }, 
        {
            userId: null,
            choice: null
        }, 
        {
            userId: null,
            choice: null
        }, 
        {
            userId: null,
            choice: null
        }, 
        {
            userId: null,
            choice: null
        }];

    var oPolls = [
    {
        id: "1",
        group: "VoteIt team",
        category: 'ion-beer',
        question: 'Should we limit the radius ?',
        choices: ['Yes', 'No', 'Just for the demo'],
        votes: oVotesRadious,
        center: {
            lat: null,
            lng: null
        },
        radius: 500,
        timeout: null,
        //calculated Values
        active: true //should be calculated according to expiration date
    },
    {
        id: "2",
        group: "VoteIt team",
        category: 'ion-beer',
        question: 'UI Theme, Red or Green ?',
        choices: ['Red', 'Green', 'Other Color'],
        votes: oVotesTheme,
        center: {
            lat: null,
            lng: null
        },
        radius: 500,
        timeout: null
    },
    {
        id: "3",
        group: "VoteIt team",
        category: 'ion-beer',
        question: 'Android or IOS ?',
        choices: ['Android', 'IOS', 'Phonegap'],
        votes: [{
            userId: null,
            choice: null
        }],
        center: {
            lat: null,
            lng: null
        },
        radius: 500,
        timeout: null
    },
    {
        id: "4",
        group: "Ninja Coders",
        category: 'ion-social-tux',
        question: 'Which framework is the best',
        choices: [],
        votes: [{
            userId: null,
            choice: null
        }],
        center: {
            lat: null,
            lng: null
        },
        radius: 500,
        timeout: null
    },
    {
        id: "5",
        group: "Mobility Inovation",
        category: 'ion-speakerphone',
        question: 'Who should win the proximiton ?',
        choices: [],
        votes: [{
            userId: null,
            choice: null
        }],
        center: {
            lat: null,
            lng: null
        },
        radius: 500,
        timeout: null
    }];
