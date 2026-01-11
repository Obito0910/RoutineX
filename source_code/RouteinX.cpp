#include <iostream>
#include <fstream>
#include <cstring>
#include <limits>
using namespace std;

const int max_task = 100;
struct Task{
    char description[101];
    int priority;
    bool completed;
    char time[6];
};
// function declarations
void initaltask(Task* tasks, int& taskCount);
void Menu();
void addtask(Task* tasks, int& taskCount);
void displaytasks(Task* tasks, int taskCount);
void marktaskcompleted(Task* tasks, int taskCount);
void savefile(Task* tasks, int taskCount, const char* filename);
void loadfromfile(Task* tasks, int& taskCount, const char* filename);
void clearinputbuffer();

int main() {

    Task tasks[max_task];
    int taskCount = 0;
    const char* filename = "tasks.txt";
    cout<<"DAILY ROUTINE MANAGER"<<endl;
    loadfromfile(tasks, taskCount, filename);
    cout<<"Loaded "<<taskCount<<" tasks from previous session."<<endl;
    int choice;

    do {
        Menu();
        cout<<"Enter your choice (1-6): ";
        cin>>choice;
        clearinputbuffer();
        switch(choice) {
            case 1:
                addtask(tasks, taskCount);
                break;
            case 2:
                displaytasks(tasks, taskCount);
                break;
            case 3:
                marktaskcompleted(tasks, taskCount);
                break;
            case 4:
                savefile(tasks, taskCount, filename);
                cout<<"Tasks saved to file successfully!"<<endl;
                break;
            case 5:
                loadfromfile(tasks, taskCount, filename);
                cout<<"Tasks reloaded from file!"<<endl;
                break;
            case 6:
                savefile(tasks, taskCount, filename);
                cout<<"Tasks saved."<<endl;
                cout<<"Thank you for using Daily Routine Manager!"<<endl;
                break;
            default:
                cout<<"Wrong Choice!"<<endl; 
                cout<<"Please enter a number between 1-6."<<endl;
        }

    } while(choice != 6);
    return 0;
}

// initialize task list
void initaltask(Task* tasks, int& taskCount) {
    taskCount = 0;
}

// Display menu
void Menu() {
    cout<<"   MAIN MENU "<<endl;
    cout<<"1. Add a New Task"<<endl;
    cout<<"2. Display All Tasks"<<endl;
    cout<<"3. Mark Task as Completed"<<endl;
    cout<<"4. Save Tasks to File"<<endl;
    cout<<"5. Reload Tasks from File"<<endl;
    cout<<"6. Exit Program"<<endl;
    cout<<"__________________________"<<endl;
}

// add task
void addtask(Task*tasks, int& taskCount){
    if(taskCount >= max_task) {
        cout << "Task list is full! Cannot add more tasks.\n\n";
        return;
    }
    Task* currentTask = &tasks[taskCount];
    cout<<"\n@@@ ADD NEW TASK @@@\n";
    cout<<"Enter task description (max 100 chars): ";
    cin.getline(currentTask->description, 101);
    cout<<"Enter time for task (HH:MM format): ";
    cin.getline(currentTask->time, 6);
    do {
        cout<<"Enter priority "<<endl;
        cout<<"1-High"<<endl;
        cout<<"2-Medium"<<endl;
        cout<<"3-Low"<<endl;
        cin>>currentTask->priority;
        clearinputbuffer();
        if(currentTask->priority < 1 || currentTask->priority>3) {
            cout<<"Invalid priority!"<<endl;
            cout<<"Please enter 1, 2, or 3."<<endl;
        }
    } while(currentTask->priority<1 || currentTask->priority>3);
    currentTask->completed = false;
    taskCount++;
    cout<<"Task added successfully!"<<endl;
}

// display tasks
void displaytasks(Task*tasks, int taskCount) {
    if(taskCount == 0) {
        cout<<"No tasks to display."<<endl<<endl;
        return;
    }
    Task* ptr=tasks;
    for(int i = 0; i < taskCount; i++) {
        cout<<"Task #"<<(i + 1)<<endl;
        cout<<"Description: "<<ptr->description<<endl;
        cout<<"Time: "<<ptr->time<<endl;
        cout<<"Priority: "<<endl;
        if(ptr->priority == 1){ 
            cout<<"High";
        }
        else if(ptr->priority == 2){
             cout<<"Medium";
        }
        else{
             cout<<"Low";
        }
        cout<<"\nStatus: ";
        if(ptr->completed){
            cout<<"COMPLETED"<<endl;
        }
        else {
            cout<<"PENDING"<<endl;
        }
        cout<<"_______________________________"<<endl;
        ptr++;
    }
    cout<<endl;
}

// mark task completed
void marktaskcompleted(Task* tasks, int taskCount) {
    if(taskCount == 0){
        cout<<"No tasks available."<<endl<<endl;
        return;
    }
    displaytasks(tasks, taskCount);
    int num;
    cout<<"Enter task number to mark completed: ";
    cin>>num;
    clearinputbuffer();
    if(num<1 || num>taskCount) {
        cout<<"Invalid task number!"<<endl;
        return;
    }
    Task* ptr=tasks+(num-1);
    if(ptr->completed) {
        cout<<"Task already completed!"<<endl;
    } else {
        ptr->completed = true;
        cout<<"Task marked as completed!"<<endl;
    }
}

// save to file
void savefile(Task* tasks, int taskCount, const char* filename) {
    ofstream file(filename);
    if(!file) {
        cout << "Error opening file!"<<endl;
        return;
    }
    file<<taskCount<<endl;
    for(int i=0; i<taskCount; i++) {
        file<<tasks[i].description <<endl;
        file<<tasks[i].time <<endl;
        file<<tasks[i].priority <<endl;
        file<<tasks[i].completed <<endl;
    }
    file.close();
}

// load from file
void loadfromfile(Task* tasks, int& taskCount, const char* filename) {
    ifstream file(filename);
    if(!file) {
        taskCount = 0;
        return;
    }
    file>>taskCount;
    file.ignore();
    for(int i=0; i<taskCount; i++) {
        file.getline(tasks[i].description, 101);
        file.getline(tasks[i].time, 6);
        file>>tasks[i].priority;
        file>>tasks[i].completed;
        file.ignore();
    }
    file.close();
}

// clear input buffer
void clearinputbuffer() {
    cin.clear();
    cin.ignore(numeric_limits<streamsize>::max(), '\n');
}
