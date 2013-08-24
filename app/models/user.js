var orm = require("orm");

orm.connect("mysql://username:password@host/database", function (err, db) {
  if (err) throw err;

    var Person = db.define("person", {
        name      : String,
        surname   : String,
        age       : Number,
        male      : Boolean,
        continent : [ "Europe", "America", "Asia", "Africa", "Australia", "Antartica" ], // ENUM type
        photo     : Buffer, // BLOB/BINARY
        data      : Object // JSON encoded
    }, {
        methods: {
            fullName: function () {
                return this.name + ' ' + this.surname;
            }
        },
        validations: {
            age: orm.enforce.ranges.number(18, undefined, "under-age")
        }
    });

    Person.find({ surname: "Doe" }, function (err, people) {
        // SQL: "SELECT * FROM person WHERE surname = 'Doe'"

        console.log("People found: %d", people.length);
        console.log("First person: %s, age %d", people[0].fullName(), people[0].age);

        people[0].age = 16;
        people[0].save(function (err) {
            // err.msg = "under-age";
        });
    });
});
