#include <stdio.h>
#include <stdlib.h>

int main() 
{ 
    int RQ[100], i, n, TotalHeadMoment = 0, initial, count = 0;

    printf("Enter the number of Requests\n"); 
    scanf("%d", &n); 

    printf("Enter the Requests sequence\n"); 
    for (i = 0; i < n; i++) 
        scanf("%d", &RQ[i]); 

    printf("Enter initial head position\n"); 
    scanf("%d", &initial); 

    // Logic for SSTF (Shortest Seek Time First) disk scheduling 
    // Loop until all requests are completed
    while (count != n) 
    { 
        int min = 1000, d, index = 0; 
        for (i = 0; i < n; i++) 
        { 
            d = abs(RQ[i] - initial);
            if (min > d) 
            { 
                min = d; 
                index = i; 
            } 
        } 
        TotalHeadMoment += min; 
        initial = RQ[index]; 
        // 1000 is used to mark this request as processed
        RQ[index] = 1000; 
        count++; 
    } 

    printf("Total head movement is %d\n", TotalHeadMoment); 
    return 0;
}

