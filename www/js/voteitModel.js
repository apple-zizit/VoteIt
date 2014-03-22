
    var oPolls = [
    {
        id: "1",
        group: "VoteIt team",
        category: 'ion-beer',
        question: 'Should we limit the radius ?',
        choices: [{
            text: 'Yes',
            userIds: [], //this is actually the number of votes for this choice
            //calculated
            votes: 5
        },
        {
            text: 'No',
            userIds: [],
            votes: 2
        },
        {
            text: 'Just for the demo',
            userIds: [],
            votes: 2
        }],
        // votes: oVotesRadious,
        center: {
            lat: null,
            lng: null
        },
        radius: 500,
        timeout: null,
        //calculated Values
        active: true, //should be calculated according to expiration date
        totalVotes: 9
    },
    {
        id: "2",
        group: "VoteIt team",
        category: 'ion-beer',
        question: 'UI Theme, Red or Green ?',
        choices: [{
            text: 'Red',
            userIds: [], //this is actually the number of votes for this choice
            //calculated
            votes: 4
        },
        {
            text: 'Green',
            userIds: [],
            votes: 1
        },
        {
            text: 'Other Color',
            userIds: [],
            votes: 3
        }],        
        center: {
            lat: null,
            lng: null
        },
        radius: 500,
        timeout: null,
         //calculated Values
        active: false, //should be calculated according to expiration date
        totalVotes: 8,
        selected: 'Red'
    },
    {
        id: "3",
        group: "VoteIt team",
        category: 'ion-beer',
        question: 'Android or IOS ?',
        choices: [{
            text: 'Android',
            userIds: [], //this is actually the number of votes for this choice
            //calculated
            votes: 14
        },
        {
            text: 'IOS',
            userIds: [],
            votes: 15
        },
        {
            text: 'Phonegap',
            userIds: [],
            votes: 23
        }],            
        center: {
            lat: null,
            lng: null
        },
        radius: 500,
        timeout: null,
         //calculated Values
        totalVotes: 52,
        selected: 'Phonegap'
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
        choices: [{
            text: 'Vote It !',
            userIds: [], //this is actually the number of votes for this choice
            //calculated
            votes: 64
        },
        {
            text: 'Other team',
            userIds: [], //this is actually the number of votes for this choice
            //calculated
            votes: 0
        }],            
        center: {
            lat: null,
            lng: null
        },
        radius: 500,
        timeout: null,
        active: true,
        totalVotes: 64,
    }];





    // var oVotesRadious = [{
    //         userId: null,
    //         choice: 'Yes'
    //     }, {
    //         userId: null,
    //         choice: 'No'
    //     }, 
    //     {
    //         userId: null,
    //         choice: 'Yes'
    //     }, 
    //     {
    //         userId: null,
    //         choice: 'Yes'
    //     }, 
    //     {
    //         userId: null,
    //         choice: 'Just for the demo'
    //     }];

    // var oVotesTheme = [{
    //         userId: null,
    //         choice: null
    //     }, {
    //         userId: null,
    //         choice: null
    //     }, 
    //     {
    //         userId: null,
    //         choice: null
    //     }, 
    //     {
    //         userId: null,
    //         choice: null
    //     }, 
    //     {
    //         userId: null,
    //         choice: null
    //     }, 
    //     {
    //         userId: null,
    //         choice: null
    //     }];
