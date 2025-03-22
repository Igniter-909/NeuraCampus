class CMSException(Exception):
    """Base exception class for CMS application"""
    def __init__(self, message="An error occurred in the CMS system", error_code=None):
        self.message = message
        self.error_code = error_code
        super().__init__(self.message)

class ValidationException(CMSException):
    """Raised when data validation fails"""
    def __init__(self, message="Validation error occurred", field=None, error_code="VAL_001"):
        self.field = field
        super().__init__(message=message, error_code=error_code)

class DatabaseException(CMSException):
    """Raised when database operations fail"""
    def __init__(self, message="Database error occurred", error_code="DB_001"):
        super().__init__(message=message, error_code=error_code)

class AuthenticationException(CMSException):
    """Raised when authentication fails"""
    def __init__(self, message="Authentication failed", error_code="AUTH_001"):
        super().__init__(message=message, error_code=error_code)

class PermissionException(CMSException):
    """Raised when user doesn't have required permissions"""
    def __init__(self, message="Permission denied", error_code="PERM_001"):
        super().__init__(message=message, error_code=error_code)

class FileOperationException(CMSException):
    """Raised when file operations fail"""
    def __init__(self, message="File operation failed", error_code="FILE_001"):
        super().__init__(message=message, error_code=error_code)

class ConfigurationException(CMSException):
    """Raised when there's a configuration error"""
    def __init__(self, message="Configuration error", error_code="CONFIG_001"):
        super().__init__(message=message, error_code=error_code)
