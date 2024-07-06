# File created to store the session_id (this file can
# be imported from anywhere in the webapp to check if
# there is an active session )

# the session_id is the same as the user_id

class Session():
    session_id = None

    
    def get_session_id(self):
        return self.session_id
    
    def assign_session_id(self, id: int):
        self.session_id = id
        return
    


current_session = Session() # session_id has not been assigned a value initially