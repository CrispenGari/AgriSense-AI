
def get_image_size(image):
    num = len(image)
    for unit in ["bytes", "KB", "MB", "GB", "TB"]:
        if num < 1024.0:
            return f"{num:.2f} {unit}"
        num /= 1024.0
    return num