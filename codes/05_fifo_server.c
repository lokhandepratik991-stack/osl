// Server Code – IPC Using FIFO (Named Pipes)
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>
#include <fcntl.h>
#include <string.h>

int main() 
{ 
    puts("Server"); 
    char strMessage[5000]; 
    int fd = open("fifo6.txt", O_WRONLY); 
    int fd2 = open("fifo7.txt", O_RDONLY); 

    if (fd == -1) 
    { 
        perror("cannot open fifo6"); 
        return EXIT_FAILURE; 
    } 
    if (fd2 == -1) 
    { 
        perror("cannot open fifo7"); 
        return EXIT_FAILURE; 
    } 

    puts("FIFO OPEN"); 
    char stringBuffer[5000]; 
    memset(stringBuffer, 0, 5000); 

    int res; 
    printf("\n\nEnter the Message to be passed (hitting ENTER without any string will terminate program): "); 
    fgets(strMessage, 100, stdin); 
    char L = (char)strlen(strMessage); 

    write(fd, &L, 1); 
    write(fd, strMessage, strlen(strMessage)); 
    fflush(stdin); 

    int len2; 
    res = read(fd2, &len2, 1); 
    read(fd2, stringBuffer, 5000); // Read String Characters 
    stringBuffer[(int)len2] = '\0'; 

    printf("\nServer Received: %s\n", stringBuffer); 

    close(fd); 
    close(fd2); 
    return 0; 
}

