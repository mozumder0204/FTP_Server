var db = require('./db');

module.exports={

	get: function(mediaId, callback){
		var sql = "select * from media where F_ID = ?";
		db.getResult(sql, [mediaId], function(result){
			callback(result);
		});
	},
	getAll: function(callback){
		var sql = "select * from media";
		db.getResult(sql, [], function(results){
			callback(results);
		});
	},
	insert: function(media, callback){
		var sql = "insert into media values ( ?, ?, ?, ?)";
		db.execute(sql, [media.F_ID, media.F_NAME, media.CATEGORY, media.F_LOCATION], function(status){
			callback(status);
		});
	},
	update: function(media, callback){
		var sql = "update media set  F_NAME = ?, CATEGORY = ?, F_LOCATION = ? where F_ID = ?";
		db.execute(sql, [ media.F_NAME, media.CATEGORY, media.F_LOCATION, media.F_ID], function(status){
            callback(status);
        });
		
	},
	delete: function(mediaId, callback){
		var sql = "delete from media where F_ID = ?";
		db.execute(sql, [mediaId], function(status){
			callback(status);
		});
	},
	

}


