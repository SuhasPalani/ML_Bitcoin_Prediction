import base64

# Your generated secret key
secret_key_bytes = b'\xe8E\x9d\xfb\x97\x8f\xc8\x0b{f\xe3\x860\x8fS\x0fX\xa8U`.\x8c\x0c.'

# Encode the bytes to base64 and decode to string
secret_key_str = base64.urlsafe_b64encode(secret_key_bytes).decode('utf-8')

print(secret_key_str)
