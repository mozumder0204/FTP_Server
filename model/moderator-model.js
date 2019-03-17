var db = require('./db');

module.exports={

	get: function(moderatorId, callback){
		var sql = "select * from moderator where M_ID = ?";
		db.getResult(sql, [moderatorId], function(result){
			callback(result);
		});
	},
	getLIKE: function(moderatorId, callback){
		var sql = "select * from moderator where M_ID LIKE ?";
		db.getResult(sql, [moderatorId], function(result){
			callback(result);
		});
	},
	getAll: function(callback){
		var sql = "select * from moderator";
		db.getResult(sql, [], function(results){
			callback(results);
		});
	},
	insert: function(moderator, callback){
		var sql = "insert into moderator values ( ?, ?, ?, ?, ?, ?)";
		
		db.execute(sql, [moderator.moderatorId, moderator.moderatorName, moderator.moderatorEmail, moderator.moderatorAddress, moderator.moderatorMobile, moderator.moderatorImage], function(status){
			callback(status);
		});
	},
	update: function(moderator, callback){
		var sql = "update moderator set  M_NAME = ?, M_EMAIL = ?, M_ADDRESS = ?, M_MOBILE = ? where M_ID = ?";
		db.execute(sql, [moderator.moderatorName, moderator.moderatorEmail, moderator.moderatorAddress, moderator.moderatorMobile, moderator.moderatorId], function(status){
			callback(status);
		});
	},
	pictureedit: function(edit, callback){
		var sql = "update moderator set  M_IMAGE = ? where M_ID = ?";
		db.execute(sql, [edit.moderatorImage, edit.moderatorId], function(status){
			callback(status);
		});
	},
	delete: function(moderatorId, callback){
		var sql = "delete from moderator where M_ID = ?";
		db.execute(sql, [moderatorId], function(status){
			callback(status);
		});
	}
}



