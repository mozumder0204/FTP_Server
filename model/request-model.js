var db = require('./db');

module.exports={

	get: function(userId, callback){
		var sql = "select * from requests where R_ID = ?";
		db.getResult(sql, [userId], function(result){
			callback(result);
		});
		
	},
	getAll: function(callback){
		var sql = "select * from requests";
		db.getResult(sql, [], function(results){
			callback(results);
		});
	},
	insert: function(info, callback){
		var sql = "insert into requests values (?,?,?)";
		db.execute(sql, [null,info.time, info.text],function(status){
			callback(status);
		});
	},
	delete: function(id, callback){
		var sql = "delete from requests where R_ID = ?";
		db.execute(sql, [id], function(status){
			callback(status);
		});
	},
	
}








