```mermaid
erDiagram
    User ||--o{ Post : "creates"
    User }o--|| Role : "has"
    
    Post }o--|| User : "authored by"
    
    ServiceRef ||--o{ MediaMetaData : "contains"
    ServiceRef }o--|| ServiceType : "has"
    
    MediaMetaData }o--|| MediaType : "has"
    MediaMetaData }o--o| ServiceRef : "references"
    
    User {
        string id PK
        string firstName
        string lastName
        string email UK
        Role role FK
        string tagline
        datetime createdAt
        datetime updatedAt
    }
    
    Post {
        string id PK
        string title
        string excerpt
        string category
        int readTime
        string content
        string authorId FK
        string thumbnail
        string authorImage
        string coverImage
        boolean trending
        boolean featured
        int likes
        int views
        boolean referenceStatus
        datetime createdAt
        datetime updatedAt
    }
    
    MediaMetaData {
        int id PK
        string publicId UK
        MediaType mediaType FK
        string serviceRefId FK
        string userId
        datetime createdAt
        datetime updatedAt
    }
    
    ServiceRef {
        string id PK
        ServiceType type FK
        datetime createdAt
        datetime updatedAt
    }
    
    Role {
        string value PK
    }
    
    MediaType {
        string value PK
    }
    
    ServiceType {
        string value PK
    }
```

**Enums:**
```
Role:
├── OWNER         (Supreme power)
├── MODERATOR     (Can appoint/demote Admins, manage space)
├── ADMIN         (Reviews posts, cannot demote Admins)
├── COLLABORATOR  (Default contributor/member)
└── USER          (Regular user with limited permissions)

MediaType:
├── IMAGE
└── VIDEO

ServiceType:
├── POST
└── PROFILE
```
