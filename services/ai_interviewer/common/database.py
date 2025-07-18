from pymongo import MongoClient
from common.config import Config

class DatabaseConnection:
    _instance = None
    _client = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(DatabaseConnection, cls).__new__(cls)
        return cls._instance
    
    def __init__(self):
        if self._client is None:
            self._client = MongoClient(Config.MONGODB_URI)
            self.db = self._client.get_database('futureforge')
    
    def get_collection(self, collection_name):
        """Get MongoDB collection"""
        return self.db[collection_name]
    
    def close_connection(self):
        """Close database connection"""
        if self._client:
            self._client.close()
