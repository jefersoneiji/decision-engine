from flask import jsonify, Flask

def registerErrorHandlers(app: Flask):
    @app.errorhandler(404)
    def not_found_error(error):
        return jsonify({'error': 'Not Found'}), 404
    
    @app.errorhandler(400)
    def bad_request(error):
        return jsonify({'error': error.description}), 400
    
    @app.errorhandler(500)
    def bad_request(error):
        return jsonify({'error': 'Server side error'}), 500
    
    @app.errorhandler(TypeError)
    def type_error_handler(error):
        if "required positional arguments" in str(error):
            return jsonify({'error': 'Missing required arguments'}), 400
    
    
